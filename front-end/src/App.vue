<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i>New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i>Test
          </router-link>
          <router-link to="/about" class="item">
            <i class="address card outline icon"></i>About
          </router-link>
        </div>
      </div>
    </div>


    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style>
#app>div.navbar {
  margin-bottom: 1.5em;
}

.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}

input {
  width: 300px;
}

div.label {
  width: 120px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}
h1 {
  text-align: center;
  margin-top: 10px !important;
  margin-bottom: 40px !important;
}
#headerContainer{
  margin-top: 20px;
  margin-bottom: 50px;
}

.ui.label {
  text-align: center;
}

.container.button {
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 30px, 0px, 10px, 0px;
  height: 60px; 
}

</style>
