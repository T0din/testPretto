"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
exports.resolverUser = void 0;
var axios_1 = require("axios");
;
var APITrustpilotFakeData = {
    total: 1254,
    next_cursor: 754236,
    reviews: [
        {
            id: 810345,
            rate: 4,
            reviewer: 'Jean-Luc',
            assigned_to: 'robert@pretto.fr',
            title: 'Super!',
            content: 'Lorem Ipusm ....',
            created_at: '2020-10-18T10:16:02Z',
            public_url: 'https://fake-trustpilot.com/pretto/811345'
        },
    ]
};
var APIAirTableFakeData = {
    items: [
        {
            id: 1,
            name: 'Robert',
            phone: 17314053,
            email: 'robert@pretto.fr',
            home_address: '1 rue de la paix, Paris',
            gender: 'Male',
            picture_url: 'https://cdn/robert_2.jpg'
        },
    ]
};
var urlTrustpilot = 'https://api.faketrustpilot.com/reviews?limit=10'; // -u pretto:password
var urlAirTable = 'https://api.airtable.com/pretto-team/items'; // -u pretto:password
var getAverageRate = function (_a) {
    var rate1 = _a.rate1, rate2 = _a.rate2, rate3 = _a.rate3, rate4 = _a.rate4, rate5 = _a.rate5, numberOfRates = _a.numberOfRates;
    return Math.round(((rate1 + rate2 * 2 + rate3 * 3 + rate4 * 4 + rate5 * 5) / numberOfRates) * 10) / 10;
};
var resolverUser = function (_a) {
    var id = _a.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var dataFromTrustpilote, dataFromAirtable, user, userReviews, filteredUser, rate1, rate2, rate3, rate4, rate5, numberOfRates, upgradedUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(urlTrustpilot)];
                case 1:
                    dataFromTrustpilote = (_b.sent()) || APITrustpilotFakeData;
                    return [4 /*yield*/, axios_1["default"].get(urlAirTable)];
                case 2:
                    dataFromAirtable = (_b.sent()) || APIAirTableFakeData;
                    user = dataFromAirtable.items.filter(function (item) { return item.id === id; });
                    userReviews = dataFromTrustpilote.reviews.filter(function (review) { return review.assigned_to === user.email; });
                    filteredUser = ['phone', 'home_address', 'gender', 'email', 'picture_url'].forEach(function (key) {
                        if (key === 'picture_url') {
                            Object.defineProperty(user, 'pictureUrl', Object.getOwnPropertyDescriptor(user, 'picture_url'));
                            delete user['picture_url'];
                        }
                        else
                            delete user[key];
                    });
                    rate1 = 0;
                    rate2 = 0;
                    rate3 = 0;
                    rate4 = 0;
                    rate5 = 0;
                    userReviews.forEach(function (review) {
                        if (review.rate === 1)
                            rate1++;
                        if (review.rate === 2)
                            rate2++;
                        if (review.rate === 3)
                            rate3++;
                        if (review.rate === 4)
                            rate4++;
                        if (review.rate === 5)
                            rate5++;
                    });
                    numberOfRates = userReviews.length;
                    upgradedUser = __assign(__assign({}, filteredUser), { reviewsCount: numberOfRates, reviewsCountOnRate: {
                            rate5: rate5,
                            rate4: rate4,
                            rate3: rate3,
                            rate2: rate2,
                            rate1: rate1
                        }, averageRate: getAverageRate({ rate1: rate1, rate2: rate2, rate3: rate3, rate4: rate4, rate5: rate5, numberOfRates: numberOfRates }) });
                    return [2 /*return*/, __assign(__assign({}, upgradedUser), { reviews: userReviews })];
            }
        });
    });
};
exports.resolverUser = resolverUser;
