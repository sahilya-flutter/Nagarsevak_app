package com.nagarsevak.app;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Edge-to-edge: allow CSS env(safe-area-inset-*) to work
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    }
}
