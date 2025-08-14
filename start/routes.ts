/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

// Redirect root to license search (home page)
Route.get("/", async ({ response }) => {
  return response.redirect("/license/search");
});

// Frontend routes
Route.get("/license/search", "LicenseController.search");
Route.get("/license/:key", "LicenseController.show");

// Admin routes
Route.group(() => {
  Route.get("/licenses", "AdminLicensesController.index").as(
    "admin.licenses.index"
  );
  Route.get("/licenses/create", "AdminLicensesController.create").as(
    "admin.licenses.create"
  );
  Route.post("/licenses", "AdminLicensesController.store").as(
    "admin.licenses.store"
  );
  Route.get("/licenses/:id", "AdminLicensesController.show").as(
    "admin.licenses.show"
  );
  Route.get("/licenses/:id/edit", "AdminLicensesController.edit").as(
    "admin.licenses.edit"
  );
  Route.put("/licenses/:id", "AdminLicensesController.update").as(
    "admin.licenses.update"
  );
  Route.post("/licenses/:id", "AdminLicensesController.update").as(
    "admin.licenses.update.post"
  );
  Route.delete("/licenses/:id", "AdminLicensesController.destroy").as(
    "admin.licenses.destroy"
  );
  Route.post("/licenses/:id/delete", "AdminLicensesController.destroy").as(
    "admin.licenses.destroy.post"
  );

  Route.get("/support-items", "AdminSupportItemsController.index").as(
    "admin.support-items.index"
  );
  Route.get("/support-items/create", "AdminSupportItemsController.create").as(
    "admin.support-items.create"
  );
  Route.post("/support-items", "AdminSupportItemsController.store").as(
    "admin.support-items.store"
  );
  Route.get("/support-items/:id", "AdminSupportItemsController.show").as(
    "admin.support-items.show"
  );
  Route.get("/support-items/:id/edit", "AdminSupportItemsController.edit").as(
    "admin.support-items.edit"
  );
  Route.put("/support-items/:id", "AdminSupportItemsController.update").as(
    "admin.support-items.update"
  );
  Route.post("/support-items/:id", "AdminSupportItemsController.update").as(
    "admin.support-items.update.post"
  );
  Route.post(
    "/support-items/:id/delete",
    "AdminSupportItemsController.destroy"
  ).as("admin.support-items.destroy");
}).prefix("/admin");
