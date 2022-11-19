export const BASE_URL = "https://restaurantapi.speedbytes.io/api/v1";

export default {
  //*********************LOGIN */
  LOGIN: `${BASE_URL}/Login`,
  GET_USER_RESTAURANTS: `${BASE_URL}/GetUserRestaurants`,
  UPDATE_RESTAURANT: `${BASE_URL}/UpdateRestaurant`,
  //***********************RESTUARANT LIST */
  GET_CURRENCY_LIST: `${BASE_URL}/GetCurrenciesList`,
  ACTIVATE_RESTUARANT: `${BASE_URL}/ActivateRestaurant`,
  SUSPEND_RESTAURANT: `${BASE_URL}/SuspendRestaurant`,
  GET_COUNTRY_LIST: `${BASE_URL}/GetCountriesList`,

  GET_RESTUARANTUSER: `${BASE_URL}/GetRestaurantUsers`,
  GET_RESTUARANTDATA: `${BASE_URL}/GetRestaurantData`,

  //************************GALLERY */
  UPLOADFILE: `${BASE_URL}/UploadFile`,
  UPDATEGALLERYPHOTO: `${BASE_URL}/UpdateGalleryPhoto`,
  SETDEFAULTPHOTO: `${BASE_URL}/SetDefaultPhoto`,
  DELETEGALLERYPHOTO: `${BASE_URL}/DeleteGalleryPhoto`,
  GET_RESTUARANTGALLERY: `${BASE_URL}/GetRestaurantGallery`,
  //************************Table */
  DELETE_ALL_TABLE: `${BASE_URL}/DeleteAllTable`,
  ADD_RESTUARANT_TABLE: `${BASE_URL}/AddRestaurantTables`,
  UPDATE_TABLE: `${BASE_URL}/UpdateTable`,
  DELETE_TABLE: `${BASE_URL}/DeleteTable`,
  GET_RESTUARANT_TABLE: `${BASE_URL}/GetRestaurantTables`,
  //***************************Logout */
  LOGOUT: `${BASE_URL}/LogOut`,
  //********************************* */
  GET_PAYMENT_INFO: `${BASE_URL}/GetPaymentInfo`,
};
