import useUrlencoded from './standard/urlencoded.js';
import useJson from './standard/json.js';
import usePublic from './standard/public.js';
import useSession from './standard/session.js';
import useMethodOverride from './standard/methodOverride.js';
import useLayouts from './standard/layouts.js';
import useFlash from './standard/flash.js';
import usePassport from './standard/passport.js';
import useResLocals from './custom/resLocals.js';

const setMiddleware = app => {
    useUrlencoded(app)
    useJson(app)
    usePublic(app)
    useSession(app)
    useMethodOverride(app)
    useLayouts(app)
    useFlash(app)
    usePassport(app)
    useResLocals(app)
}

export default setMiddleware;
