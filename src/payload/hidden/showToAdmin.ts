export const showToAdmin = ({ user }) => {
  return !(user as any)?.roles?.includes('admin')
}
