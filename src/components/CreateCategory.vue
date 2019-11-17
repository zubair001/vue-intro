<template>
    <div id="app">
        <div class="w-full m-10">
            <div v-if="!success" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                 role="alert">
                <strong class="font-bold">{{ message }}</strong>

                <ul v-if="errors">
                    <li v-for="(value, key) in errors" v-bind:key="key">
                        <p v-if="value.length > 1">
                            <span v-for="(message, key) in value" v-bind:key="key">{{ message }}</span><br/>
                        </p>
                        <p v-else>
                            {{ value[0] }}
                        </p>
                    </li>
                </ul>

                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                </span>
            </div>

            <form class="m-10">
                <div class="flex flex-wrap">
                    <div class="w-full">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="title">
                            Title
                        </label>

                        <input id="title" type="text" placeholder="Enter Title" v-model="title"
                               class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <div class="w-full">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               for="body">
                            Body
                        </label>

                        <textarea id="body" placeholder="Enter Body" v-model="body"
                                  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"></textarea>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <div class="w-full">
                        <button @click.prevent="createPost"
                                class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            Create Category
                        </button>
                    </div>
                </div>
            </form>

            <router-link to="/"
                         class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Go to Post
            </router-link>

            <div class="m-10" v-if="title.length > 0 && body.length > 0">
                <h2 class="font-bold text-700">
                    {{ title }}
                </h2>
                <p>
                    {{ body }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data: function() {
      return {
        title: '',
        body: '',
        success: true,
        message: '',
        errors: false,
      };
    },
    methods: {
      createPost: function() {
        this.success = true;
        this.message = '';
        this.errors = false;

        window.axios({
          method: 'post',
          url: 'https://develop.pos-api.kodeeo.com/v1/categories/store',
          data: {
            name: this.title,
            description: this.body,
            status: true,
            vat: 15,
          },
        }).then(response => {
          // show popup with message from server
          this.title = '';
          this.body = '';
          let message = `Category ID ${response.data.data.id} created.`;

          window.Swal.fire(
              response.data.message,
              message,
              'success',
          );
        }).catch(error => {
          const response = error.response.data;
          this.success = response.success;
          this.message = response.message;
          this.errors = response.data;
        });
      },
    },
  };
</script>
