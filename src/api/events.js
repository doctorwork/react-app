/*
 * File: events.js
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>) 
 * Date: 2018-05-Su 02:39:39
 * Copyright 2018 - 2018 © Doctorwork
 */

class Event {
    maps = {};
    fire(type) {
        const stack = this.maps[type] || [];

        stack.every(listener => listener());
    }

    listen(type, listener) {
        if (!this.maps.hasOwnProperty(type)) {
            this.maps[type] = [];
        }

        this.maps[type].push(listener);
    }

    remove(type, listener) {
        const index = this.maps.indexOf(listener);
        this.maps.splice(index, 1);
    }
}

export default new Event();
