import { defineStore } from "pinia";

export const usePlaygroundStore = defineStore('playgroundStore', {
    state: () => ({
        htmlValue: '',
        cssValue: '',
        jsValue: '',
    }),
    actions: {
        writeHTML (payload) {
            this.htmlValue = payload;
        },
        writeCSS (payload) {
            this.cssValue = payload;
        },
        writeJS (payload) {
            this.jsValue = payload;
        }
    }
});