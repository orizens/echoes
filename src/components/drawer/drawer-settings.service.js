/* @ngInject */
export default function DrawerSettings () {
    var isOpen = true;
    var service = {
        toggle: toggle,
        opened: opened
    };
    return service;

    ////////////////

    function toggle() {
        isOpen = !isOpen;
    }

    function opened () {
        return isOpen;
    }
}