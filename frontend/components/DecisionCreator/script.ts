import { QVBSC } from "../../types";

export function decisionValidate(createDS: QVBSC.Decision) {
    if (!checkName()) {
        return false;
    } else if (!checkDesc()) {
        return false;
    } else if (!checkPosition()) {
        return false;
    } else if (!checkEndTime()) {
        return false;
    }
    return true;
    function checkEndTime() {
        return createDS.endTime > Date.now();
    }
    function checkName() {
        return createDS.name.length > 0;
    }
    function checkDesc() {
        return createDS.description.length > 0;
    }
    function checkPosition() {
        if (createDS.options.length > 1) {
            return true;
        } else {
            return false;
        }
    }
}