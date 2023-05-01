"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

parasails.registerPage('wasteitem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    syncing: false,
    cloudError: "",

    listView: "/admin/waste/wastelist",
    saveAction: "savewaste",

    saved: false,
    saveAndClose: false,
    isEdit: false,

    formData: {
      id: 0,
      name: '',
      quantity: 0
    },

    formErrors: {}
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function beforeMount() {
    _.extend(this, SAILS_LOCALS);

    this.formData.id = this.data ? this.data.id : 0;
    this.formData.name = this.data ? this.data.name : '';
    this.formData.quantity = this.data ? this.data.quantity : null;
    this.isEdit = this.data ? true : false;
  },
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
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

    savedAndClose: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.saveAndClose = true;

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function savedAndClose() {
        return _ref2.apply(this, arguments);
      }

      return savedAndClose;
    }(),

    //VALIDATION
    handleParsingForm: function handleParsingForm() {
      this.formErrors = {};
      this.saved = false;

      var argins = this.formData;

      if (!argins.name) {
        this.formErrors.name = true;
      }

      if (!argins.quantity) {
        this.formErrors.quantity = true;
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      console.log('Data came to argins');
      console.log(argins);

      return argins;
    },

    submittedForm: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(result) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (result.error_status == 0) {
                  if (this.saveAndClose == true) {
                    window.location.href = this.listView;
                  } else {
                    this.saved = true;
                    this.formData.id = result.data.id;
                    this.formData.slug = result.data.slug;
                    window.scrollTo(0, 0);
                  }
                } else {
                  this.cloudError = true;
                  this.saved = false;
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function submittedForm(_x) {
        return _ref3.apply(this, arguments);
      }

      return submittedForm;
    }(),

    successMsgClose: function successMsgClose() {
      this.saved = false;
    }
  }
});
