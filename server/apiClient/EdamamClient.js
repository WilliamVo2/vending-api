import got from "got"
import dotenv from "dotenv"
dotenv.config()

const EdamamKey=process.env.EDAMAM_API_KEY
const EdamamId=process.env.EDAMAM_API_ID
const baseUrl= "https://api.edamam.com/api/food-database/v2/parser"

class EdamamClient {
  static async getSoftDrinks(health) {
    try {
      const url = `${baseUrl}?app_id=${EdamamId}&app_key=${EdamamKey}&ingr=drink&nutrition-type=${health}&random=true`;
      const apiResponse = await got(url)
      const responseBody = apiResponse.responseBody
    }catch (error) {
      return {error: error.message}
    }
  }
}

export default EdamamClient