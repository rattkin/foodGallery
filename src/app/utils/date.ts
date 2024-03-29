import { startTime, endTime, startDay, endDay, startMenuTime, endMenuTime, startMenuDay, endMenuDay, allowOrder } from '../config';

export function isOrderPossible(time: moment.Moment) {
    if (
        allowOrder &&
        (
            isOpen(time) ||
            isBeforeOpen(time)
        )
    ) {
        return true;
    } else {
        return false;
    }
}
export function isOpen(time: moment.Moment) {
    if (
        time.isBetween(startTime, endTime, 'minute', '[]') &&
        time.isBetween(startDay, endDay, 'day', '[]')
    ) {
        return true;
    } else {
        return false;
    }
}

export function isMenu(time: moment.Moment) {
    if (
        time.isBetween(startMenuTime, endMenuTime, 'minute', '[]') &&
        time.isBetween(startMenuDay, endMenuDay, 'day', '[]')
    ) {
        return true;
    } else {
        return false;
    }
}

export function isBeforeOpen(time: moment.Moment) {
    if (
        time.isBefore(startTime) &&
        time.isBetween(startDay, endDay, 'day', '[]')
    ) {
        return true;
    } else {
        return false;
    }
}

export function isAfterClose(time: moment.Moment) {
    if (
        time.isAfter(endTime) &&
        time.isBetween(startDay, endDay, 'day', '[]')
    ) {
        return true;
    } else {
        return false;
    }
}

export function isClosedDay(time: moment.Moment) {
    if (
        time.isBetween(startDay, endDay, 'day', '[]')
    ) {
        return false;
    } else {
        return true;
    }
}

export function isUntilMenuEnd(time: moment.Moment) {
    if (
        time.isBetween(startMenuDay, endMenuDay, 'day', '[]') &&
        time.isBefore(endMenuTime)
    ) {
        return true;
    } else {
        return false;
    }
}
