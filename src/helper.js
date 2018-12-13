//Simple random ID generator
export default {
  IdGenerator() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
};
