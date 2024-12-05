export interface PasswordReset {
    id: string;          // UUID
    userId: string;      // ID del usuario
    token: string;       // Token de restablecimiento
    createdAt: string;
    expiresAt: string;
  }
  