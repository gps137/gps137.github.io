/*
 * Author: Greg Sinclair
 * Date: December 21, 2021
 * 
 * Copyright (c) Gregory Sinclair. All rights reserved.  
 * Licensed under the MIT License.  
 */

import java.util.ArrayList;
import java.util.List;

public class Coins {

	/*
	 * Main function. Prints out the most efficient coin combination(s). WARNING:
	 * this program leaves room for optimization. -- Because it currently evaluates
	 * all unique coin combinations, full execution can take two or three minutes.
	 * Requires no input, outputs to terminal.
	 * 
	 * As currently posted, the code finds and prints two optimal combinations: 1,
	 * 5, 18, 25, using an average of 3.89 coins 1, 5, 18, 29, also using an average
	 * of 3.89 coins
	 * 
	 */
	public static void main(String[] args) {
		int best = Integer.MAX_VALUE;
		int coin1 = 1, coin2 = 1, coin3 = 1, coin4 = 1;
		System.out.println("Current coin values of 1 5 10 25 result in an average of " + averageCoins(1, 5, 10, 25)
				+ " coins to reach all 100 values.");
		List<finalCoins> finalResults = optimalCoins();
		System.out.println(
				"Optimal value(s) for a four-coin system and the average number of coins to reach all 100 values:");
		for (int i = 0; i < finalResults.size(); i++) {
			System.out.println(finalResults.get(i).toString());
		}
	}

	/*
	 * Creates and maintains a list of all objects, called finalCoins, that are more
	 * efficient than all predecessors. -- Since ties are possible,
	 * equally-efficient objects are collected instead of a single object. Takes no
	 * variables, outputs a list of finalCoins.
	 * 
	 */
	public static List<finalCoins> optimalCoins() {
		List<finalCoins> allCoins = new ArrayList<finalCoins>(0);
		int i, j, k, l;
		double maxCoins = Double.MAX_VALUE;
		for (i = 1; i <= 99; i++) {
			for (j = i + 1; j <= 99; j++) {
				for (k = j + 1; k <= 99; k++) {
					for (l = k + 1; l <= 99; l++) {
						double coinage = averageCoins(i, j, k, l);
						if (coinage < maxCoins) {
							maxCoins = coinage;
							allCoins.clear();
							finalCoins result = new finalCoins(i, j, k, l, coinage);
							allCoins.add(result);
							// Uncomment the following line in order to be updated whenever it reaches new,
							// most-efficient combinations.
							// System.out.println(result.toString());
						} else if (coinage == maxCoins) {
							allCoins.add(new finalCoins(i, j, k, l, coinage));
						}
					}
				}
			}
		}
		return allCoins;
	}

	/*
	 * Calculates the average number of coins required for an input coin
	 * combination, given all 100 possible decimal values. -- Area of future
	 * research: the below assumes decimal values are equally-likely and are
	 * therefore equally-weighted. With statistical study into the frequency of
	 * currency appearance, appropriate weights could be assigned to particular
	 * values and significantly alter the final result to better fit real-world
	 * experience. Requires parameters for each of the four coins, returns the
	 * average optimal number of coins.
	 */
	public static double averageCoins(int coin1, int coin2, int coin3, int coin4) {
		double sum = 0;
		for (int i = 0; i <= 99; i++) {
			sum += bestCoins(i, coin1, coin2, coin3, coin4);
		}
		return sum / 100.;
	}

	/*
	 * Determines the optimal number of coins to reach a particular value. Note:
	 * this is believed to be the most time complex portion of the code, and the
	 * area most likely to leave room open for optimization. Accepts a value, and a
	 * variable for each coin value. Returns the optimal number of coins to reach
	 * said value.
	 * 
	 */
	public static int bestCoins(int value, int coin1, int coin2, int coin3, int coin4) {
		int optimal = Integer.MAX_VALUE;
		for (int i = 0; i * coin1 <= 99; i++) {
			for (int j = 0; j * coin2 <= 99; j++) {
				for (int k = 0; k * coin3 <= 99; k++) {
					for (int l = 0; l * coin4 <= 99; l++) {
						if (i * coin1 + j * coin2 + k * coin3 + l * coin4 > value) {
							break;
						}
						if (i * coin1 + j * coin2 + k * coin3 + l * coin4 == value) {
							int tot = i + j + k + l;
							if (tot < optimal) {
								optimal = tot;
							}
						}
					}
				}
			}
		}
		return optimal;
	}

	/*
	 * Class finalCoins represents a value for each coin 1-4 and the average of its
	 * optimal coin combinations. Includes a constructor, private data members, and
	 * a toString function.
	 * 
	 */
	public static class finalCoins {
		private int coin1, coin2, coin3, coin4;
		private double average;

		public finalCoins(int coin1, int coin2, int coin3, int coin4, double average) {
			this.coin1 = coin1;
			this.coin2 = coin2;
			this.coin3 = coin3;
			this.coin4 = coin4;
			this.average = average;
		}

		public String toString() {
			return "    " + coin1 + " " + coin2 + " " + coin3 + " " + coin4 + ": " + average + " coins";
		}
	}
}
