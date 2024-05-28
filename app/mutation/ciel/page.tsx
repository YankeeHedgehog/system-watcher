import { Box, Container, Typography } from '@mui/material'

export default function SystemCiel() {
  return (
    <Container sx={{ mt: 3 }}>
      {/* アカウントごとの共通の設定 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" component="h2">
          共通設定
        </Typography>
        <Typography variant="body2" color="GrayText">
          共通の設定を記載できます。対象のアカウント全てに対して設定を行います。検証結果によって反映することができない団体は一覧で取得されます。
        </Typography>
      </Box>

      {/* アカウントごとの個別の設定 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" component="h2">
          個別設定
        </Typography>
      </Box>
    </Container>
  )
}
