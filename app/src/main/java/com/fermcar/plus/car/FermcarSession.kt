package com.fermcar.plus.car

import android.content.Intent
import androidx.car.app.Screen
import androidx.car.app.Session

class FermcarSession : Session() {
    override fun onCreateScreen(intent: Intent): Screen {
        return VideoScreen(carContext)
    }
}
