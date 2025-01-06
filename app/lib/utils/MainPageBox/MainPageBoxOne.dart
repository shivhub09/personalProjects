import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Mainpageboxone extends StatefulWidget {
  final String title;
  final IconData icon;
  const Mainpageboxone({required this.title, required this.icon});

  @override
  State<Mainpageboxone> createState() => _MainpageboxoneState();
}

class _MainpageboxoneState extends State<Mainpageboxone> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.blueAccent, Colors.deepPurpleAccent],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            spreadRadius: 2,
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      padding: const EdgeInsets.all(16),
      width: 170,
      height: 170,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(widget.icon, size: 60, color: Colors.white),
          const SizedBox(height: 10),
          Text(
            widget.title,
            style: GoogleFonts.poppins(
              fontWeight: FontWeight.bold,
              fontSize: 18,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
