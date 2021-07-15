import { ipcRenderer, IpcRendererEvent, IpcRenderer } from 'electron';
import { eventToP } from '@pokemonon/knife';

const ELECTRON_IPC_ENCAPSULATION_EVENT = 'ELECTRON_IPC_ENCAPSULATION_EVENT';
interface CreateRendererCommOpts {
    defaultTarget?: IpcRenderer
}
const createRendererComm = ({
    defaultTarget = ipcRenderer,
}: CreateRendererCommOpts = {}) => {
    return eventToP<IpcRendererEvent>({
        onAdapter(cb) {
            function callback(event: IpcRendererEvent, ...args) {
                const [eventName, ...data] = args;
                cb(eventName, event, data);
            }
            ipcRenderer.on(ELECTRON_IPC_ENCAPSULATION_EVENT, callback);
            return () => {
                ipcRenderer.removeListener(ELECTRON_IPC_ENCAPSULATION_EVENT, callback);
            };
        },
        emitAdapter(info) {
            const {
                emitTarget,
                evt,
                eventName,
                data,
            } = info;
            const target = emitTarget || evt?.sender || defaultTarget;
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

export default createRendererComm;