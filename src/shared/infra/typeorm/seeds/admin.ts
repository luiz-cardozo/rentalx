import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, drivers_license, "isAdmin", created_at)
      VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', 'admin' ,true, 'now()')
    `
  );

  await connection.close;
}

create().then(() => console.log("User admin created"));
