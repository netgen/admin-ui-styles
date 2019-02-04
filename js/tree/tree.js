import $ from 'jquery';
require('jstree');

/* options for NgUiTree class
    'modal' - boolean - is the tree opened in modal window (default false)
    'treeClassName' - string - class name for div on which jstree is initialized (default 'ng-ui-tree')
    'modalClassName' - string - class name for modal div in which tree is opened (default 'ng-modal')
*/
export default class NgUiTree {
  constructor(el, options) {
    if (el.dataset.nguitree) return;
    this.settings = Object.assign({}, {
      modal: false,
      treeClassName: 'ng-ui-tree',
      modalClassName: 'ng-modal',
    }, options);
    this.el = el;
    this.tree = this.el.querySelector(`.${this.settings.treeClassName}`);
    this.$tree = $(this.tree);
    this.disableSubtree = this.tree.dataset.disablesubtree;

    if (this.settings.modal) {
      this.modal = this.el.querySelector(`.${this.settings.modalClassName}`);
      this.modalInit();
    }

    this.treeInit();
  }

  treeInit() {
    global.$ = global.jQuery = $;
    this.el.dataset.nguitree = true;
    this.$tree.jstree({
      plugins: ['sort', 'contextmenu', 'ui'],
      contextmenu: {
        select_node: false,
        items: this.settings.modal ? '' : NgUiTree.treeContextMenu,
      },
      core: {
        worker: false,
        data: {
          url: (node) => {
            const route = this.tree.dataset.path;
            const rootItemId = this.tree.dataset.rootitemid;

            return route
            .replace('_itemId_', node.id)
            .replace('#', `${rootItemId}/true`);
          },
        },
        themes: {
          name: 'ng-ui',
        },
      },
    })
    .on('ready.jstree', (e, data) => {
      let selectedItemPath = this.tree.dataset.selecteditempath || '/0/';

      selectedItemPath = selectedItemPath.replace(/^\//, '').replace(/\/$/, '').split('/');
      this.$tree.jstree(true).load_node(selectedItemPath, () => {
        const selectedNodeId = selectedItemPath[selectedItemPath.length - 1];
        data.instance.select_node(selectedNodeId);
        if (!this.settings.modal) this.$tree.find(`a#${selectedNodeId}_anchor`).addClass('selected');
      });
      if (this.disableSubtree !== '') {
        this.disableSubtree.toString().split(',').forEach((element) => {
          this.disableNode(element);
        });
      }
    })
    .on('load_node.jstree', (event, data) => {
      if (this.disableSubtree !== '' && this.disableSubtree.toString().split(',').indexOf(data.node.id) !== -1) {
        this.disableNode(data.node.id);
      }
    })
    .on('open_node.jstree', () => {
      if (this.disableSubtree !== '') this.disableNode(this.disableSubtree);
    })
    .on('click', '.jstree-anchor', (e) => {
      const selectedNode = $(e.currentTarget).jstree(true).get_node($(e.currentTarget));

      if (this.disableSubtree !== '') {
        this.disableSubtree = this.disableSubtree.toString().split(',');
        if (this.disableSubtree.indexOf(selectedNode.id) !== -1) return;

        const filteredDisableSubtree = this.disableSubtree.filter(el => selectedNode.parents.indexOf(el) !== -1);

        if (filteredDisableSubtree.length > 0) return;
      }

      if (!this.settings.modal) {
        document.location.href = selectedNode.a_attr.href;
      } else {
        this.el.querySelector('input.item-id').value = selectedNode.id;

        if (selectedNode.text === undefined || selectedNode.id === '0') {
          this.el.querySelector('span.ng-ui-keyword').innerHTML = this.el.dataset.novaluetext;
        } else {
          this.el.querySelector('span.ng-ui-keyword').innerHTML = selectedNode.text;
        }
        this.closeModal();
      }
    });
  }

  /** Disables the provided node.
  * @param nodeId */
  disableNode(nodeId) {
    this.$tree.find(`li#${nodeId}`).addClass('disabled');
  }

  /** Builds context menu for right click on a item in tree.
  * @param node */
  static treeContextMenu(node) {
    const menu = {};

    node.data.context_menu.forEach((item) => {
      menu[item.name] = {
        label: item.text,
        action: () => {
          window.location.href = item.url;
        },
      };
    });

    return menu;
  }

  modalInit() {
    /** Opens modal when modal open button is clicked. */
    $(this.el).on('click', '.modal-tree-button', this.openModal.bind(this));

    /** It closes modal when Close span inside modal is clicked. */
    $(this.modal).on('click', '.close', this.closeModal.bind(this));

    /** It closes modal when user clicks anywhere outside modal window. */
    $(window).on('click', (e) => {
      if (e.target.className === this.settings.modalClassName) this.closeModal();
    });
  }

  openModal() {
    if (!this.settings.modal) return;
    $(this.modal).show();
  }

  closeModal() {
    if (!this.settings.modal) return;
    $(this.modal).hide();
  }
}
