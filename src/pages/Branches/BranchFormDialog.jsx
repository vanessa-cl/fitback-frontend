<Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: SECONDARY_COLOR, mb: 2 }}
            >
              {isEditing ? "Editar Filial" : "Nova Filial"}
            </Typography>

            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Nome da Filial"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Endereço"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Cidade"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Estado"
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Telefone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Gerente responsável"
                value={form.manager}
                onChange={(e) => setForm({ ...form, manager: e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: PRIMARY_COLOR,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        { backgroundColor: PRIMARY_COLOR },
                    }}
                  />
                }
                label={form.isActive ? "Ativa" : "Inativa"}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                {isEditing ? (
                  <>
                    <Button
                      startIcon={<SaveIcon />}
                      variant="contained"
                      onClick={handleUpdate}
                      sx={{
                        flex: 1,
                        bgcolor: PRIMARY_COLOR,
                        "&:hover": { bgcolor: DARK_PRIMARY },
                      }}
                    >
                      Salvar
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      onClick={resetForm}
                      sx={{
                        flex: 1,
                        borderColor: SECONDARY_COLOR,
                        color: SECONDARY_COLOR,
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleAdd}
                    fullWidth
                    sx={{
                      bgcolor: PRIMARY_COLOR,
                      "&:hover": { bgcolor: DARK_PRIMARY },
                    }}
                  >
                    Adicionar Filial
                  </Button>
                )}
              </Box>

              {/* <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: LIGHT_BG }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Resumo
                </Typography>
                <Typography variant="body2">
                  Total de filiais: {branches.length}
                </Typography>
                <Typography variant="body2">
                  Filiais ativas: {branches.filter((b) => b.isActive).length}
                </Typography>
              </Paper> */}
            </Box>
          </Paper>
        </Grid>
      </Grid>