db.orders.aggregate( [
    {
      $lookup:
        {
          from: "filmSchema",
          localField: "id",
          foreignField: "prizes",
          as: "agragacaoSchema"
        }
   }
 ] )