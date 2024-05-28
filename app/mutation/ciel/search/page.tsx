import { Box, Grid, Typography } from '@mui/material'

export default function Search() {
  // TODO: 検索設定の編集
  return (
    <Box>
      <Typography variant="h5" component="h2">
        検索設定
      </Typography>

      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  )
}
