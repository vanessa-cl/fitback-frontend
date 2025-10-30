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

  // Seções
  formSection: {
    mb: 4
  },
  filterSection: {
    mb: 3
  },

  // Tabela
  tableHeaderRow: {
    backgroundColor: '#f5f5f5'
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(178, 94, 9, 0.04)'
    }
  },
  selectedRow: {
    backgroundColor: 'rgba(178, 94, 9, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(178, 94, 9, 0.12)'
    }
  },

  // Ícones
  checkIcon: {
    color: '#B25E09'
  },
  uncheckedIcon: {
    color: '#757575'
  },

  // Botões
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 3
  },
  backButton: {
    color: '#B25E09',
    border: '1px solid #B25E09'
  },
  nextButton: {
    backgroundColor: '#B25E09',
    '&:hover': {
      backgroundColor: '#914d07'
    }
  }
};