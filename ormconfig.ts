import { DataSource } from 'typeorm';
import { User } from 'src/users/user.entity'; // ajusta el path si usas otras entidades
import 'dotenv/config'; // 👈 ESTA LÍNEA ES FUNDAMENTAL

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'], // usamos el build
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
