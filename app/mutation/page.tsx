'use client'

import {
  Checkbox,
  Container,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'

export default function Ciel() {
  // 対象の環境
  const [targetEnv, setTargetEnv] = useState('社内作業環境')
  const changeTargetEnv = (e: SelectChangeEvent) => {
    setTargetEnv(e.target.value)
  }

  // 対象のシステム
  const [targetSystem, setTargetSystem] = useState('Ciel')
  const changeTargetSystem = (e: SelectChangeEvent) => {
    setTargetSystem(e.target.value)
  }

  // 対象の団体
  const [users, setUsers] = useState(usersWithSelected)
  const changeUserSelected = (email: string) => {
    const newUsers = users.map((user) =>
      user.email === email ? { ...user, isSelected: !user.isSelected } : user
    )
    setUsers(newUsers)
  }

  // 対象の団体絞り込み
  const [searchFilter, setSearchFilter] = useState('')
  const changeSearchFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value)
  }
  const usersFiltered = users.filter((user) =>
    user.email.includes(searchFilter)
  )
  const checkedUsersFiltered = usersFiltered.every(
    (user) => user.isSelected === true
  )
  const selectAllUsersFiltered = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsersFiltered = users.map((user) => {
      return {
        ...user,
        isSelected: user.email.includes(searchFilter)
          ? event.target.checked
          : user.isSelected,
      }
    })
    setUsers(newUsersFiltered)
  }

  // 選択済みの団体一覧
  const selectedUsers = users.filter((user) => user.isSelected)

  return (
    <Container>
      <Typography variant="h5" component="h2">
        更新の対象を絞り込み
      </Typography>
      {/* 対象の環境 */}
      <Select value={targetEnv} onChange={changeTargetEnv} label="対象の団体">
        <MenuItem value="社内作業環境">社内作業環境</MenuItem>
        <MenuItem value="社内本番同等環境">社内本番同等環境</MenuItem>
        <MenuItem value="本番環境">本番環境</MenuItem>
      </Select>
      {/* 対象のシステム */}
      <Select
        value={targetSystem}
        onChange={changeTargetSystem}
        label="対象のシステム"
        sx={{ ml: 2 }}
      >
        <MenuItem value="Ciel">Ciel</MenuItem>
        <MenuItem value="Aegis">Aegis</MenuItem>
        <MenuItem value="Patio">Patio</MenuItem>
      </Select>
      {/* 対象の団体 */}
      <Grid container sx={{ mt: 2 }} spacing={3}>
        <Grid item xs={8}>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Checkbox
              checked={checkedUsersFiltered}
              onChange={selectAllUsersFiltered}
            />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="e.g. username@domain.co.jp..."
              inputProps={{ 'aria-label': 'search google maps' }}
              value={searchFilter}
              onChange={changeSearchFilter}
            />
          </Paper>

          <List>
            {usersFiltered.map((user) => (
              <ListItem key={user.email} disablePadding>
                <ListItemButton
                  dense
                  onClick={() => changeUserSelected(user.email)}
                  sx={{ paddingY: 0 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={user.isSelected}
                      tabIndex={-1}
                      disableRipple
                      sx={{ paddingY: 0 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={user.email.toString()}
                    primary={user.email}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" sx={{ my: 1 }}>
            更新対象のアカウント
          </Typography>
          <List>
            {selectedUsers.map((user) => (
              <ListItem key={user.email} disablePadding>
                <ListItemButton
                  dense
                  onClick={() => changeUserSelected(user.email)}
                  sx={{ paddingY: 0 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={user.isSelected}
                      tabIndex={-1}
                      disableRipple
                      sx={{ paddingY: 0 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={user.email.toString()}
                    primary={user.email}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

const Users = [{ email: 'aaa@bbb' }, { email: 'ccc@ddd' }]

const usersWithSelected = Users.map((user) => {
  return { ...user, isSelected: false }
})

type Users = {
  email: string
}

type Env = {
  name: string
}

type System = {
  name: string
}
