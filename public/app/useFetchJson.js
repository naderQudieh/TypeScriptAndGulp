"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchJson = void 0;
const react_1 = require("react");
/**
 * Fetch example Json data
 * Not recommended for production use!
 */
const useFetchJson = (url, limit) => {
    const [data, setData] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            setLoading(true);
            // Note error handling is omitted here for brevity
            const response = yield fetch(url);
            const json = yield response.json();
            const data = limit ? json.slice(0, limit) : json;
            setData(data);
            setLoading(false);
        });
        fetchData();
    }, [url, limit]);
    return { data, loading };
};
exports.useFetchJson = useFetchJson;
