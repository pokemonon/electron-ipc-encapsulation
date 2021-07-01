import { IpcMainEvent, ipcMain } from 'electron';
import { eventToP } from '@pokemonon/knife';

const ELECTRON_IPC_ENCAPSULATION_EVENT = 'ELECTRON_IPC_ENCAPSULATION_EVENT';
const createMainComm = () => {
    return eventToP<IpcMainEvent>({
        onAdapter(cb) {
            function callback(event: IpcMainEvent, ...args) {
                const [eventName, ...data] = args;
                cb(eventName, event, data);
            }
            ipcMain.on(ELECTRON_IPC_ENCAPSULATION_EVENT, callback);
            return () => {
                ipcMain.removeListener(ELECTRON_IPC_ENCAPSULATION_EVENT, callback);
            };
        },
        emitAdapter(info) {
            const {
                emitTarget,
                evt,
                eventName,
                data,
            } = info;
            const target = emitTarget || evt?.sender;
            if (!target) {
                throw new Error('no exist target');
            }
            if (!eventName) {
                return;
            }
            target.send(ELECTRON_IPC_ENCAPSULATION_EVENT, eventName, ...data);
        },
    });
};

export default createMainComm;