"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

parasails.registerPage('product', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    syncing: false,
    cloudError: "",

    listView: "/admin/product/productlist",
    saveAction: "saveproduct",

    saved: false,
    saveAndClose: false,
    isEdit: false,

    formData: {
      id: 0,
      name: "",
      slug: "",
      type: "",
      weight: 0,
      location: "",
      productImage: {},
      image: {
        uploadStarted: false,
        uploadError: false,
        thumbnail: ''
      },
      company_id: "",
      minBid: 0,
      maxBid: 0

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
    this.formData.slug = this.data ? this.data.slug : '';
    this.formData.type = this.data ? this.data.type : '';
    this.formData.weight = this.data ? this.data.weight : null;
    this.formData.location = this.data ? this.data.location : '';
    this.formData.productImage = this.data ? this.data.productImage : {
      fileName: '',
      size: '',
      url: ''
    };
    this.formData.company_id = this.data && this.data.company_id ? this.data.company_id.id : 0;
    this.formData.minBid = this.data ? this.data.minBid : null;
    this.formData.maxBid = this.data ? this.data.maxBid : null;
    this.isEdit = this.data ? true : false;

    if (this.data && this.data.productImage) {
      this.formData.image = {
        uploadStarted: false,
        uploadError: false,
        thumbnail: this.data.productImage
      };
    }
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

    uploadFile: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                $("input[id='productImage']").click();

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function uploadFile() {
        return _ref3.apply(this, arguments);
      }

      return uploadFile;
    }(),

    changeFileInput: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(files, x) {
        var selectedFile, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                selectedFile = files[0];


                this.formData.productImage = {
                  fileName: selectedFile.name,
                  size: this.convertBytes(selectedFile.size),
                  url: ''
                };

                if (selectedFile) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return");

              case 4:

                this.formData.image.uploadError = false;
                this.formData.image.uploadStarted = true;

                this.$forceUpdate();

                console.log('Media ', selectedFile);

                _context4.next = 10;
                return Cloud.uploadfile.with({
                  mediaFile: selectedFile
                });

              case 10:
                result = _context4.sent;


                this.formData.image.uploadStarted = false;

                if (result) {
                  this.formData.productImage.url = result.mediaFileUrl;
                  this.formData.productImage.extension = result.mediaFileUrl.split('.').pop();
                } else {
                  this.formData.image.uploadError = true;
                }

                this.$forceUpdate();

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function changeFileInput(_x, _x2) {
        return _ref4.apply(this, arguments);
      }

      return changeFileInput;
    }(),

    removeThumbnail: function removeThumbnail() {
      this.formData.productImage = {
        fileName: '',
        size: '',
        url: ''
      };
      this.$forceUpdate();
    },

    // VALIDATION
    handleParsingForm: function handleParsingForm() {

      this.formErrors = {};
      this.saved = false;

      var argins = this.formData;

      console.log('Argins ', argins);

      if (!argins.name) {
        this.formErrors.name = true;
      }

      if (!argins.type) {
        this.formErrors.type = true;
      }

      if (!argins.weight) {
        this.formErrors.weight = true;
      }

      if (!argins.location) {
        this.formErrors.location = true;
      }

      if (!argins.company_id) {
        this.formErrors.company_id = true;
      }

      if (!argins.minBid) {
        this.formErrors.minBid = true;
      }

      if (!argins.maxBid) {
        this.formErrors.maxBid = true;
      }

      if (!this.formData.productImage.url) {
        this.formData.image.uploadError = true;
        return;
      }

      console.log('Data came to argins');
      console.log(argins);

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    submittedForm: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(result) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
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
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function submittedForm(_x3) {
        return _ref5.apply(this, arguments);
      }

      return submittedForm;
    }(),

    successMsgClose: function successMsgClose() {
      this.saved = false;
    },

    convertBytes: function convertBytes(bytes) {
      var output;
      if (bytes >= 1000000) {
        output = (bytes / 1000000).toFixed(1) + ' MB';
      } else if (bytes >= 1000) {
        output = (bytes / 1000).toFixed(1) + ' kB';
      } else {
        output = bytes + ' b';
      }

      return output;
    }

  }
});
