package abi49_0_0.expo.modules.cellular

import abi49_0_0.expo.modules.kotlin.types.Enumerable

enum class CellularGeneration(val value: Int) : Enumerable {
  UNKNOWN(0),
  CG_2G(1),
  CG_3G(2),
  CG_4G(3),
  CG_5G(4)
}
