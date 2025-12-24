export default class HealthController {
  public async handle() {
    return {
      message: 'Server is running',
    }
  }
}
