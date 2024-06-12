// TODO: Can't be injected by this way
const snackbar = useSnackbar();
export function logger(type:any, message:any) {
  snackbar.add({ type: type, text: message })
}