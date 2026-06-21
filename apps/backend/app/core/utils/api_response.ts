export default class ApiResponse {
  public static success(data: any = null, message: string = 'Operation completed successfully') {
    return {
      status: 'success',
      message: message,
      data: data,
    }
  }
  public static paginated(data: any, meta: any, message: string = 'Data retrieved successfully') {
    return {
      status: 'success',
      message: message,
      data: data,
      meta: meta,
    }
  }
  public static created(data: any, message: string = 'Resource created successfully') {
    return {
      status: 'success',
      message: message,
      data: data,
    }
  }
}
