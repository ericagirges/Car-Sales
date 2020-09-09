import { ADD_FEATURE, REMOVE_FEATURE } from "../actions/index";

const initialState = {
  additionalPrice: 0,
  car: {
    price: 26395,
    name: "2019 Ford Mustang",
    image:
      "https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg",
    features: [],
  },
  additionalFeatures: [
    { id: 1, name: "V-6 engine", price: 1500 },
    { id: 2, name: "Racing detail package", price: 1500 },
    { id: 3, name: "Premium sound system", price: 500 },
    { id: 4, name: "Rear spoiler", price: 250 },
  ],
};

export default (state = initialState, action) => {
  let features;
  switch (action.type) {
    case ADD_FEATURE:
      const hasFeature = state.car.features.find(
        (feature) => feature.id === action.payload.id
      );

      // if the feature already exists, we just keep the features array unchanged
      features = hasFeature
        ? state.car.features
        : [...state.car.features, action.payload];

      return {
        ...state,
        car: {
          ...state.car,
          features,
        },
        additionalPrice: features.reduce((a, b) => a + b.price, 0),
      };
    case REMOVE_FEATURE:
      features = state.car.features.filter(
        (feature) => feature.id !== action.payload.id
      );
      return {
        ...state,
        car: {
          ...state.car,
          features,
        },
        additionalPrice: features.reduce((a, b) => a + b.price, 0),
      };

    default:
      return state;
  }
};
