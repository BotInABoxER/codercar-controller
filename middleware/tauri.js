export default function ({ route, redirect }) {
  if (route.path.startsWith('/text/html,')) {
    redirect('301', '/')
  }
}
