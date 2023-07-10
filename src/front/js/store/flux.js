const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: "",
		user: {},
		apiUrl: process.env.BACKEND_URL,
	  },
	  actions: {
		// Use getActions to call a function within a function
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
  
		changeColor: (index, color) => {
		  //get the store
		  const store = getStore();
  
		  //we have to loop the entire demo array to look for the respective index
		  //and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  //reset the global store
		  setStore({ demo: demo });
		},
		
		
				login: async (email, password) => {
				  try {
					const response = await fetch(process.env.BACKEND_URL + "/api/log-in", {
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
					  },
					  body: JSON.stringify({
						email: email,
						password: password,
					  }),
					});
		  
					if (response.ok) {
					  const data = await response.json();
					  setStore({ user: data });
					  localStorage.setItem("user", JSON.stringify(data));
					  return data;
					} else {
					  throw new Error("Login failed");
					}
				  } catch (error) {
					throw new Error("Login failed");
				  }
				},
		
		  
		 
		  

		verifyUser:(token) =>{
			fetch(process.env.BACKEND_URL + "/api/user-by-token",{
				method: "GET",
			    headers: {
					Authorization: "Bearer " + token
				  },
				  redirect: "follow",
			})
			.then((response) => response.json())
			.then((result)=> setStore({user:result}))
			.catch((error)=> console.log(error))

		},  
		  
  
		checkUser: () => {
		  if (localStorage.getItem("token")) {
			setStore({
			  token: JSON.parse(localStorage.getItem("token")),
			  user: JSON.parse(localStorage.getItem("user")),
			});
		  }
		},
  
		logout: () => {
		  setStore({
			token: "",
			user: {},
			posts: [],
			userPosts: [],
		  });
		  localStorage.removeItem("token");
		  localStorage.removeItem("user");
		},
	  },
	};
  };
  
  export default getState;
  
