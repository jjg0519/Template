"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntitysBase_1 = require("../../Common/Entitys/EntitysBase");
var NetServiceBase_1 = require("../../Common/Service/NetServiceBase");
var NetService_1 = require("../../Common/Service/NetService");
var IndexPageData = (function (_super) {
    __extends(IndexPageData, _super);
    function IndexPageData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canIUse = wx.canIUse("button.open-type.getUserInfo");
        _this.Authorized = true;
        return _this;
    }
    return IndexPageData;
}(EntitysBase_1.Wx_PageData));
var IndexPage = (function (_super) {
    __extends(IndexPage, _super);
    function IndexPage() {
        var _this = _super.call(this) || this;
        _this.Data = new IndexPageData();
        _this.data = _this.Data;
        return _this;
    }
    IndexPage.prototype.onLoad = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.Data;
                        return [4, NetServiceBase_1.Wx_GetSetting()];
                    case 1:
                        _a.Authorized = _b.sent();
                        return [4, setTimeout(function () {
                                if (_this.Data.Authorized) {
                                    wx.reLaunch({
                                        url: "../index/index"
                                    });
                                }
                                else {
                                    _this.ApplyChange(_this.Data);
                                }
                            }, 600)];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    IndexPage.prototype.bindGetUserInfo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var code, fullUserInfo, fullUserInfoStr, UserInfo, Authorized;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(options);
                        return [4, NetServiceBase_1.Wx_GetLoginCode()];
                    case 1:
                        code = _a.sent();
                        fullUserInfo = options.detail;
                        fullUserInfoStr = JSON.stringify(fullUserInfo);
                        return [4, NetService_1.Wx_UserLogin(code, fullUserInfoStr)];
                    case 2:
                        UserInfo = _a.sent();
                        wx.setStorageSync("EncryptStr", UserInfo.encryptStr);
                        wx.setStorageSync("UnionId", UserInfo.userInfo.unionId);
                        return [4, NetServiceBase_1.Wx_GetSetting()];
                    case 3:
                        Authorized = _a.sent();
                        if (Authorized) {
                            wx.reLaunch({
                                url: "../index/index"
                            });
                        }
                        return [2];
                }
            });
        });
    };
    return IndexPage;
}(EntitysBase_1.Wx_Page));
Page(new IndexPage());