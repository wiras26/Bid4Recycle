'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

parasails.registerPage('productitem', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formData: {
      id: 0,
      userDetails: '',
      bidAmount: null
    },

    invalidBid: false,
    emptyField: false,
    offered: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function beforeMount() {
    this.data = this.data ? this.data : {};
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
    saveBid: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result, argins;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log(this.me);
                result = {};
                argins = this.formData;

                if (argins.bidAmount) {
                  _context2.next = 7;
                  break;
                }

                this.data.emptyField = true;
                this.$forceUpdate();
                return _context2.abrupt('return');

              case 7:
                if (!(argins.bidAmount < this.data.minBid)) {
                  _context2.next = 11;
                  break;
                }

                this.data.invalid = true;
                this.$forceUpdate();
                return _context2.abrupt('return');

              case 11:
                _context2.next = 13;
                return Cloud.savebid.with({
                  userDetails: this.me,
                  userId: this.me.id,
                  productId: this.data.id,
                  productName: this.data.name,
                  bidAmount: this.formData.bidAmount
                });

              case 13:
                result = _context2.sent;

                if (!(result !== {})) {
                  _context2.next = 19;
                  break;
                }

                console.log("HELLO");
                this.data.offered = true;
                this.$forceUpdate();
                return _context2.abrupt('return');

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveBid() {
        return _ref2.apply(this, arguments);
      }

      return saveBid;
    }()
  }
});
