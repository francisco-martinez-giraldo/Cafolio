"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const supabase_1 = require("../../config/supabase");
const login = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email es requerido' });
        }
        const { data, error } = await supabase_1.supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true
            }
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({
            message: 'Magic link enviado al email (login/registro automático)',
            data
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map