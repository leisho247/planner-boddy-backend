<<<<<<< HEAD
// src/config/database.config.ts
=======
>>>>>>> features/usersInEvent
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
<<<<<<< HEAD
}));
=======
}));
>>>>>>> features/usersInEvent
