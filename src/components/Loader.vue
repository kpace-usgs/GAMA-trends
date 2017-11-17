
<script>


export default {
	name: 'Loader',

  data(){
    return {
      isLoading: false
    }
  },
  methods: {
    toggleLoading(binary){
      console.log('toggle loader to: ' + binary);
      this.isLoading = binary;
    }
  }
};

</script>

