import Logger from "@ioc:Adonis/Core/Logger";
import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    "403": "errors/unauthorized",
    "404": "errors/404",
    "500..599": "errors/500",
  };

  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: any) {
    // Check if it's a 404 error by looking at the error message
    if (error.message && error.message.includes("E_ROUTE_NOT_FOUND")) {
      return ctx.view.render("errors/404");
    }

    // Check if it's a row not found error
    if (error.message && error.message.includes("E_ROW_NOT_FOUND")) {
      return ctx.view.render("errors/e_row_not_found");
    }

    // For other errors, use the parent handler
    return super.handle(error, ctx);
  }

  public async report(error: any, ctx: any) {
    // Log errors for monitoring
    Logger.error(
      { err: error, url: ctx.request.url(), method: ctx.request.method() },
      "Exception reported"
    );

    // Use parent report method
    return super.report(error, ctx);
  }
}
