import { defineStore } from "pinia";

export const usePlaygroundStore = defineStore('playgroundStore', {
    state: () => ({
        htmlValue: '',
        cssValue: '',
        jsValue: '',
        theme: localStorage.getItem('theme') || 'vs-dark',
        view: localStorage.getItem('view') || 'view1',
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
        },
        changeTheme (payload) {
            this.theme = payload;
        },
        changeView (payload) {
            this.view = payload;
        }
    }
});