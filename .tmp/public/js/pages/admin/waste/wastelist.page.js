'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

parasails.registerPage('wastelist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: '',
    formErrors: {},

    listView: '/waste/wastelist',
    itemView: '/admin/waste/edit/',
    removeAction: 'removewaste',

    deleteModalOpen: false,
    clickedIndex: undefined,
    loading: false,

    formData: {
      name: ''
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function beforeMount() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    this.formData.name = this.filter.name ? this.filter.name : '';
  },
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    deleteWaste: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(index) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:

                this.loading = true;

                if (!this.data[index].id) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return Cloud.removewaste.with({
                  waste_id: this.data[index].id
                });

              case 4:

                this.data[index] = [];
                this.data = this.data.filter(function (item, i) {
                  return i !== index;
                });
                this.deleteModalOpen = false;

                this.loading = false;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteWaste(_x) {
        return _ref2.apply(this, arguments);
      }

      return deleteWaste;
    }(),

    modalOpen: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(index) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:

                this.clickedIndex = index;
                this.deleteModalOpen = true;

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function modalOpen(_x2) {
        return _ref3.apply(this, arguments);
      }

      return modalOpen;
    }(),

    closeModal: function closeModal() {

      this.deleteModalOpen = false;
      this.cloudError = '';
    }
  }
});
