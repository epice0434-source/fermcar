package com.fermcar.plus.car

import android.graphics.Rect
import androidx.car.app.CarContext
import androidx.car.app.Screen
import androidx.car.app.SurfaceCallback
import androidx.car.app.SurfaceContainer
import androidx.car.app.model.Action
import androidx.car.app.model.ActionStrip
import androidx.car.app.model.CarColor
import androidx.car.app.model.CarIcon
import androidx.car.app.model.NavigationTemplate
import androidx.car.app.model.Template
import androidx.core.graphics.drawable.IconCompat
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import com.fermcar.plus.R

class VideoScreen(carContext: CarContext) : Screen(carContext), SurfaceCallback {

    private var exoPlayer: ExoPlayer? = null

    init {
        // Observe lifecycle to handle surface
        carContext.getCarService(androidx.car.app.AppManager::class.java)
            .setSurfaceCallback(this)
    }

    override fun onGetTemplate(): Template {
        return NavigationTemplate.Builder()
            .setActionStrip(
                ActionStrip.Builder()
                    .addAction(Action.Builder()
                        .setTitle("Geri")
                        .setOnClickListener { finish() }
                        .build())
                    .build()
            )
            .setBackgroundColor(CarColor.BLACK)
            .build()
    }

    override fun onSurfaceAvailable(surfaceContainer: SurfaceContainer) {
        val surface = surfaceContainer.surface
        if (surface != null) {
            exoPlayer = ExoPlayer.Builder(carContext).build()
            exoPlayer?.setVideoSurface(surface)
            
            // Example: Play a sample video
            val mediaItem = MediaItem.fromUri("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
            exoPlayer?.setMediaItem(mediaItem)
            exoPlayer?.prepare()
            exoPlayer?.play()
        }
    }

    override fun onSurfaceDestroyed(surfaceContainer: SurfaceContainer) {
        exoPlayer?.release()
        exoPlayer = null
    }

    override fun onVisibleAreaChanged(visibleArea: Rect) {
        // Handle screen resizing
    }

    override fun onStableAreaChanged(stableArea: Rect) {
        // Handle stable area
    }
}
