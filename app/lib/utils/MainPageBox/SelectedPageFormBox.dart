import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SelectedPageFormBox extends StatefulWidget {
  final String title;
  final IconData icon;
  const SelectedPageFormBox(
      {super.key, required this.title, required this.icon});

  @override
  State<SelectedPageFormBox> createState() => _SelectedPageFormBoxState();
}

class _SelectedPageFormBoxState extends State<SelectedPageFormBox> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.lightGreen, Colors.green],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      padding: const EdgeInsets.all(16),
      width: 360,
      height: 180,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "22",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w500,
                  fontSize: 50,
                  color: Colors.white70,
                ),
              ),
              Text(
                widget.title,
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                  color: Colors.white,
                ),
              ),
            ],
          ),
          Container(
            decoration: BoxDecoration(color: Colors.white24),
            width: 2,
            height: 120,
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                "20",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w500,
                  fontSize: 50,
                  color: Colors.white70,
                ),
              ),
              Text(
                "Approved",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
