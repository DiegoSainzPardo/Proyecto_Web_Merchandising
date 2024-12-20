function app() {
  return {
    loggedIn:         false,
    user:             {},
    token:            null,
    registerData:     { username: '', password: '' },
    loginData:        { username: '', password: '' },
    elementData:      { name: '', description: '', category: '' },  // No es necesario collection en la creación
    elements:         [],
    filterCategory:   '',  // Filtro por categoría
    editingElement:   false,
    currentElementId: null,
    showLogin:        false,
    showRegister:     true,

    async register() 
    {
      try 
      {
        const response = await fetch('http://localhost:3000/api/auth/register', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.registerData),
        });

        if (!response.ok) throw new Error(await response.text());
        alert('Registration successful! Please log in.');
        this.registerData = { username: '', password: '' };
        this.showLogin    = true;
        this.showRegister = false;
      }
      catch (err) 
      {
        alert(`Registration failed: ${err.message}`);
      }
    },

    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.loginData),
        });
        if (!response.ok) throw new Error(await response.text());
        const data     = await response.json();
        this.token     = data.token;
        this.user      = { username: this.loginData.username };
        this.loggedIn  = true;
        this.loginData = { username: '', password: '' };
        this.fetchElements(); 
      } 
      catch (err)
      {
        alert(`Login failed: ${err.message}`);
      }
    },

    logout() 
    {
      this.loggedIn         = false;
      this.token            = null;
      this.user             = {};
      this.elements         = [];
      this.showLogin        = false;
      this.showRegister     = true;

      this.editingElement   = false;
      this.currentElementId = null;
      this.elementData      = { name: '', description: '', category: '' };
    },

    // Función para obtener los elementos con filtro de categoría
    async fetchElements() 
    {
      try 
      {
        const query    = this.filterCategory ? `?category=${this.filterCategory}` : '';
        const response = await fetch(`http://localhost:3000/api/elements${query}`, 
        {
          headers: { Authorization: this.token },
        });

        if (!response.ok) throw new Error(await response.text());
        this.elements = await response.json();
      }
      catch (err) 
      {
        alert(`Failed to fetch elements: ${err.message}`);
      }
    },

    // Función para filtrar elementos por categoría
    filterByCategory(category) 
    {
      this.filterCategory = category;
      this.fetchElements();
    },

    // Crear un nuevo elemento
    async createElement() 
    {
      try 
      {
        const response = await fetch('http://localhost:3000/api/elements', 
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
          body: JSON.stringify(this.elementData),
        });
        
        if (!response.ok) throw new Error(await response.text());
        const newElement = await response.json();
        this.elements.push(newElement);
        this.elementData = { name: '', description: '', category: '' };  // Limpiar campos
      } 
      catch (err) 
      {
        alert(`Failed to create element: ${err.message}`);
      }
    },

    // Actualizar un elemento existente
    async updateElement() 
    {
      try 
      {
        const response = await fetch(`http://localhost:3000/api/elements/${this.currentElementId}`, 
        {
          method: 'PUT',
          headers: 
          {
            'Content-Type': 'application/json',
            Authorization: this.token,
          },

          body: JSON.stringify(this.elementData),
        });

        if (!response.ok) { throw new Error(await response.text()); }
        this.fetchElements();
        this.elementData      = { name: '', description: '', category: '' };
        this.editingElement   = false;
        this.currentElementId = null;
      }
      catch (err) 
      {
        alert(`Failed to update element: ${err.message}`);
      }
    },

    // Eliminar un elemento
    async deleteElement(elementId) 
    {
      try 
      {
        const response = await fetch(`http://localhost:3000/api/elements/${elementId}`, 
        {
          method: 'DELETE',
          headers: 
          {
            Authorization: this.token,
          },
        });

        if (!response.ok) throw new Error(await response.text());
      
        this.elements = this.elements.filter(element => element._id !== elementId);
      } 
      catch (err) 
      {
        alert(`Failed to delete element: ${err.message}`);
      }
    },

    // Iniciar el proceso de edición
    editElement(element) 
    {
      this.editingElement   = true;
      this.currentElementId = element._id;
      this.elementData      = { name: element.name, description: element.description, category: element.category }; // Cargar datos para editar
    },

    // Cancelar la edición
    cancelEdit() 
    {
      this.editingElement   = false;
      this.currentElementId = null;
      this.elementData      = { name: '', description: '', category: '' };
    },
  };
}
