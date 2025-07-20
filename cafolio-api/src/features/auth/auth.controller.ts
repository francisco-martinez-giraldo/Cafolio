import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }

    const { data, error } = await supabase.auth.signInWithOtp({
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
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

