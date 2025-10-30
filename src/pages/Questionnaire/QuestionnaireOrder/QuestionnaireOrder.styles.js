export const styles = {
  // Container principal
  container: {
    p: 3,
    maxWidth: 1200,
    mx: 'auto'
  },

  // Títulos
  pageTitle: {
    color: '#616161',
    fontSize: '24px',
    fontWeight: 500,
    mb: 3
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 500,
    color: '#424242',
    mb: 2
  },

  // Tabela
  tableHeaderRow: {
    backgroundColor: '#f5f5f5'
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgba(178, 94, 9, 0.04)'
    }
  },

  // Botões de navegação
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 3
  },
  backButton: {
    color: '#B25E09',
    border: '1px solid #B25E09'
  },
  saveButton: {
    backgroundColor: '#B25E09',
    '&:hover': {
      backgroundColor: '#914d07'
    }
  }
};